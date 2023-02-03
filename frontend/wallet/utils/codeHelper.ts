import * as fcl from "@onflow/fcl";
import {
  extractScriptArguments,
  extractTransactionArguments,
  getTemplateInfo,
  mapArguments,
  splitArgs,
} from "@onflow/flow-cadut";
import * as t from "@onflow/types";

import { CADENCE_CODE_TYPE } from "../constants";

const parseUnhandledCode = (code: string) => {
  const contractName = code.split("contract ")?.[1].split(" {")?.[0] || "";
  const splitArgArr = code.split("init(");
  const args = splitArgArr[splitArgArr.length - 1].split(")")[0] || "";

  return {
    args,
    contractName,
    type: CADENCE_CODE_TYPE.CONTRACT,
  };
};

const getArgsPair = (args: string[]) => {
  const argPairList = [];
  const contractArgs: string[] = [];
  const len = args.length;
  for (let i = 0; i < len; i += 2) {
    argPairList.push({
      key: args[i],
      type: args[i + 1],
    });
    contractArgs.push(`${args[i]}: ${args[i]}`);
  }

  return { contractArgs: contractArgs.join(", "), argPairList };
};

const setFclArgs = async (
  argPairList: Array<{ key: string; type: string }>,
  restArgs: unknown[],
  contractName?: string,
  contractCode?: string
) => {
  if (argPairList.length !== restArgs.length) {
    throw new Error(
      `incorrect number of arguments, expect ${argPairList.length} but got ${restArgs.length}`
    );
  }

  let fclArgs: ArgumentObject[] = [];

  if (contractName) {
    fclArgs.push(fcl.arg(contractName, t.String));
  }
  if (contractCode) {
    fclArgs.push(
      fcl.arg(Buffer.from(contractCode, "utf8").toString("hex"), t.String)
    );
  }

  // Script expects multiple arguments
  const schema = argPairList.map((argPair) => argPair.type);
  const restFclArgs = await mapArguments(schema, restArgs).catch(
    (err: unknown) => {
      throw err;
    }
  );
  fclArgs = fclArgs.concat(restFclArgs);

  return fclArgs;
};

const decodeCadenceCode = (code: string) => {
  let templateInfo = getTemplateInfo(code);
  if (templateInfo.type === CADENCE_CODE_TYPE.UNKNOWN) {
    templateInfo = parseUnhandledCode(code);
  }

  let splitArgList: string[] = [];
  if (templateInfo.type === CADENCE_CODE_TYPE.CONTRACT) {
    splitArgList = splitArgs(templateInfo.args as string);
  } else if (templateInfo.type !== CADENCE_CODE_TYPE.UNKNOWN) {
    splitArgList = Array.isArray(templateInfo.args)
      ? templateInfo.args.map((arg) => splitArgs(arg)).flat()
      : [];
  }

  const { argPairList } = getArgsPair(
    splitArgList.filter((str: string) => str !== ",")
  );

  return {
    code,
    argPairList,
    type: templateInfo.type,
    signers: templateInfo.signers,
    contractName: templateInfo.contractName,
  };
};

const handleOriginInputArgs = (
  argsData: Record<string, string>,
  argPairList?: Array<{
    key: string;
    type: string;
  }>
) => {
  const args: any[] = [];
  argPairList &&
    argPairList.forEach((argPair) => {
      let inputArg: any;
      try {
        inputArg = JSON.parse(argsData?.[argPair.key]);
      } catch {
        inputArg = argsData?.[argPair.key];
      }
      args.push(inputArg);
    });
  return args;
};

const handleDeployData = async (contractCode: string, restArgs: unknown[]) => {
  let templateInfo = getTemplateInfo(contractCode);
  if (templateInfo.type === CADENCE_CODE_TYPE.UNKNOWN) {
    templateInfo = parseUnhandledCode(contractCode);
  }

  // const { contractArgs, argPairList } = getArgsPair(
  //   splitArgs(templateInfo.args as string).filter((str: string) => str !== ',')
  // );

  const fclArgs = await setFclArgs(
    [],
    restArgs,
    templateInfo.contractName,
    contractCode
  );

  return {
    contractName: templateInfo.contractName,
    deployTransactionRestArg: "",
    contractAddRestArg: "",
    fclArgs,
  };
};

const handleInteractData = async (
  script: string,
  args: unknown[],
  isTransaction?: boolean
) => {
  const argPairStrings = isTransaction
    ? extractTransactionArguments(script)
    : extractScriptArguments(script);

  const splitArgList = argPairStrings.map((arg) => splitArgs(arg)).flat();
  const { argPairList } = getArgsPair(
    splitArgList.filter((str: string) => str !== ",")
  );
  const fclArgs = await setFclArgs(argPairList, args);

  return { argPairList, fclArgs };
};

export {
  decodeCadenceCode,
  handleDeployData,
  handleInteractData,
  handleOriginInputArgs,
};
