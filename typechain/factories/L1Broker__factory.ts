/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { L1Broker } from "../L1Broker";

export class L1Broker__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _messenger: string,
    _l2Checkpoint: string,
    _token: string,
    overrides?: Overrides
  ): Promise<L1Broker> {
    return super.deploy(
      _messenger,
      _l2Checkpoint,
      _token,
      overrides || {}
    ) as Promise<L1Broker>;
  }
  getDeployTransaction(
    _messenger: string,
    _l2Checkpoint: string,
    _token: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _messenger,
      _l2Checkpoint,
      _token,
      overrides || {}
    );
  }
  attach(address: string): L1Broker {
    return super.attach(address) as L1Broker;
  }
  connect(signer: Signer): L1Broker__factory {
    return super.connect(signer) as L1Broker__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L1Broker {
    return new Contract(address, _abi, signerOrProvider) as L1Broker;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract L1InstantCrossDomainMessenger",
        name: "_messenger",
        type: "address",
      },
      {
        internalType: "address",
        name: "_l2Checkpoint",
        type: "address",
      },
      {
        internalType: "contract L1OptimismWithdraw",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "l2Checkpoint",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messenger",
    outputs: [
      {
        internalType: "contract L1InstantCrossDomainMessenger",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "l1ERC20",
        type: "address",
      },
      {
        internalType: "address",
        name: "l2ERC20",
        type: "address",
      },
      {
        internalType: "address",
        name: "l1Bank",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintIOU",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "redeemIOU",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract L1OptimismWithdraw",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060035534801561001557600080fd5b50604051610a40380380610a408339818101604052606081101561003857600080fd5b5080516020820151604090920151600080546001600160a01b039384166001600160a01b03199182161790915560028054948416948216949094179093556001805492909116919092161790556109ac806100946000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063526cf3d711610050578063526cf3d714610102578063f73d912c1461010a578063fc0c546a1461012f57610067565b806323d4d38a1461006c5780633cb747bf146100d1575b600080fd5b6100bf600480360360a081101561008257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020810135821691604082013581169160608101359091169060800135610137565b60408051918252519081900360200190f35b6100d9610329565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100d9610345565b61012d6004803603604081101561012057600080fd5b5080359060200135610361565b005b6100d96104d0565b6000805473ffffffffffffffffffffffffffffffffffffffff1633146101a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260358152602001806109186035913960400191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636e296e456040518163ffffffff1660e01b815260040160206040518083038186803b15801561020e57600080fd5b505afa158015610222573d6000803e3d6000fd5b505050506040513d602081101561023857600080fd5b505160025473ffffffffffffffffffffffffffffffffffffffff90811691161461026157600080fd5b6003805460018082019092559054604080517f7d835c780000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff8a8116602483015289811660448301528881166064830152878116608483015260a4820187905291519190921691637d835c789160c480830192600092919082900301818387803b15801561030657600080fd5b505af115801561031a573d6000803e3d6000fd5b50929998505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b600154604080517ff5298aca0000000000000000000000000000000000000000000000000000000081523360048201526024810184905260448101859052905173ffffffffffffffffffffffffffffffffffffffff9092169163f5298aca9160648082019260009290919082900301818387803b1580156103e157600080fd5b505af11580156103f5573d6000803e3d6000fd5b5050600154604080517fe3684e390000000000000000000000000000000000000000000000000000000081526004810187905290516000945084935073ffffffffffffffffffffffffffffffffffffffff9092169163e3684e3991602480820192606092909190829003018186803b15801561047057600080fd5b505afa158015610484573d6000803e3d6000fd5b505050506040513d606081101561049a57600080fd5b50805160409091015190925090506104ca73ffffffffffffffffffffffffffffffffffffffff83168233866104ec565b50505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b6040805173ffffffffffffffffffffffffffffffffffffffff80861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790526104ca90859060606105de826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166106599092919063ffffffff16565b805190915015610654578080602001905160208110156105fd57600080fd5b5051610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a81526020018061094d602a913960400191505060405180910390fd5b505050565b60606106688484600085610672565b90505b9392505050565b6060824710156106cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806108f26026913960400191505060405180910390fd5b6106d68561082d565b61074157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b602083106107ab57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161076e565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461080d576040519150601f19603f3d011682016040523d82523d6000602084013e610812565b606091505b5091509150610822828286610833565b979650505050505050565b3b151590565b6060831561084257508161066b565b8251156108525782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156108b657818101518382015260200161089e565b50505050905090810190601f1680156108e35780820380516001836020036101000a031916815260200191505b509250505060405180910390fdfe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4f6e6c79207468652063726f737320646f6d61696e206d657373656e6765722063616e2063616c6c2074686973206d6574686f642e5361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a2646970667358221220473e5dc9e1dacbbcaef393619f133d10407c5bab7f71486813e1b1a3eefdbe7564736f6c63430007030033";
