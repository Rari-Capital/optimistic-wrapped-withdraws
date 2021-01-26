/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface L1OptimismWithdrawContract
  extends Truffle.Contract<L1OptimismWithdrawInstance> {
  "new"(
    _l1Broker: string,
    meta?: Truffle.TransactionDetails
  ): Promise<L1OptimismWithdrawInstance>;
}

export interface ApprovalForAll {
  name: "ApprovalForAll";
  args: {
    account: string;
    operator: string;
    approved: boolean;
    0: string;
    1: string;
    2: boolean;
  };
}

export interface TransferBatch {
  name: "TransferBatch";
  args: {
    operator: string;
    from: string;
    to: string;
    ids: BN[];
    values: BN[];
    0: string;
    1: string;
    2: string;
    3: BN[];
    4: BN[];
  };
}

export interface TransferSingle {
  name: "TransferSingle";
  args: {
    operator: string;
    from: string;
    to: string;
    id: BN;
    value: BN;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: BN;
  };
}

export interface URI {
  name: "URI";
  args: {
    value: string;
    id: BN;
    0: string;
    1: BN;
  };
}

type AllEvents = ApprovalForAll | TransferBatch | TransferSingle | URI;

export interface L1OptimismWithdrawInstance extends Truffle.ContractInstance {
  balanceOf(
    account: string,
    id: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  balanceOfBatch(
    accounts: string[],
    ids: (number | BN | string)[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  burn: {
    (
      owner: string,
      amount: number | BN | string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      owner: string,
      amount: number | BN | string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      owner: string,
      amount: number | BN | string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      owner: string,
      amount: number | BN | string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isApprovedForAll(
    account: string,
    operator: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  metadata(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: string; 1: string }>;

  mint: {
    (
      id: number | BN | string,
      recipient: string,
      l1ERC20: string,
      l2ERC20: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      id: number | BN | string,
      recipient: string,
      l1ERC20: string,
      l2ERC20: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      id: number | BN | string,
      recipient: string,
      l1ERC20: string,
      l2ERC20: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      id: number | BN | string,
      recipient: string,
      l1ERC20: string,
      l2ERC20: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  safeBatchTransferFrom: {
    (
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  safeTransferFrom: {
    (
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  setApprovalForAll: {
    (
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  supportsInterface(
    interfaceId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  uri(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  methods: {
    balanceOf(
      account: string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    balanceOfBatch(
      accounts: string[],
      ids: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    burn: {
      (
        owner: string,
        amount: number | BN | string,
        id: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        owner: string,
        amount: number | BN | string,
        id: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        owner: string,
        amount: number | BN | string,
        id: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        owner: string,
        amount: number | BN | string,
        id: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isApprovedForAll(
      account: string,
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    metadata(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: string; 1: string }>;

    mint: {
      (
        id: number | BN | string,
        recipient: string,
        l1ERC20: string,
        l2ERC20: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        id: number | BN | string,
        recipient: string,
        l1ERC20: string,
        l2ERC20: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        id: number | BN | string,
        recipient: string,
        l1ERC20: string,
        l2ERC20: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        id: number | BN | string,
        recipient: string,
        l1ERC20: string,
        l2ERC20: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    safeBatchTransferFrom: {
      (
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    safeTransferFrom: {
      (
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    setApprovalForAll: {
      (
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    supportsInterface(
      interfaceId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    uri(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
