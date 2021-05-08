/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IFundManagerInterface extends ethers.utils.Interface {
  functions: {
    "getInterestFeesUnclaimed()": FunctionFragment;
    "getRebalancerPercentage()": FunctionFragment;
    "withdrawInterestFees(uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getInterestFeesUnclaimed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRebalancerPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawInterestFees",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getInterestFeesUnclaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRebalancerPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawInterestFees",
    data: BytesLike
  ): Result;

  events: {};
}

export class IFundManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IFundManagerInterface;

  functions: {
    getInterestFeesUnclaimed(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getInterestFeesUnclaimed()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getRebalancerPercentage(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "getRebalancerPercentage()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdrawInterestFees(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdrawInterestFees(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  getInterestFeesUnclaimed(overrides?: Overrides): Promise<ContractTransaction>;

  "getInterestFeesUnclaimed()"(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getRebalancerPercentage(overrides?: Overrides): Promise<ContractTransaction>;

  "getRebalancerPercentage()"(
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdrawInterestFees(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdrawInterestFees(uint256,address)"(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    getInterestFeesUnclaimed(overrides?: CallOverrides): Promise<BigNumber>;

    "getInterestFeesUnclaimed()"(overrides?: CallOverrides): Promise<BigNumber>;

    getRebalancerPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    "getRebalancerPercentage()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawInterestFees(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawInterestFees(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getInterestFeesUnclaimed(overrides?: Overrides): Promise<BigNumber>;

    "getInterestFeesUnclaimed()"(overrides?: Overrides): Promise<BigNumber>;

    getRebalancerPercentage(overrides?: Overrides): Promise<BigNumber>;

    "getRebalancerPercentage()"(overrides?: Overrides): Promise<BigNumber>;

    withdrawInterestFees(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdrawInterestFees(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getInterestFeesUnclaimed(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getInterestFeesUnclaimed()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getRebalancerPercentage(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "getRebalancerPercentage()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    withdrawInterestFees(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdrawInterestFees(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}