import { useWriteContract } from 'wagmi'
import { fefe } from './abi'
console.log(fefe)
const abi = fefe.abi
console.log(abi)

const myAddress = "0xfa6Cc5134a2e81a2F19113992Ef61F9BE81cafdE"
const tmpTokenDetails = [
    {
        tokenId: 0,
        amount: 1,
        price: 2,


    }
]

export default function App() {
    const { writeContract } = useWriteContract()

    return (
        <div>

            <h1>hello</h1>
            <button
                onClick={async () => {
                    console.log('hello')
                    const result =  writeContract({
                        abi,
                        address: '0x2da2d32ecdcb7c89b0fc435625b1052cddae2d5e',
                        functionName: 'createTrade',
                        args: [
                            myAddress, tmpTokenDetails
                        ],
                    })

                    console.log(result)
                }

                }
            >
                Transfer
            </button>
            <h1>hello</h1>
        </div>
    )
}


{/* <button
className="btn btn-primary"
onClick={async () => {
  try {
    await writeYourContractAsync({
      functionName: "createTrade",
      args: [myAddress, tmpTokenDetails]
    });
  } catch (e) {
    console.error("Error setting greeting:", e);
  }
}}
>
Set Greeting
</button> */}