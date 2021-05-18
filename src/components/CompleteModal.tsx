/* eslint-disable max-len */
import { Modal } from '@geist-ui/react'
import useSWR from 'swr'

export default function CompleteModal({ visible, hide, token: tokenId }) {
    const { data: token } = useSWR(tokenId ? `/api/tokens/${tokenId}` : null)

    return (
        <>
            <div>
                {token && (
                    <>
                        <div className="space-y-4 p-6 text-center">
                            <img className="block w-32 mx-auto pixelated" src={`/tokens/image/${token.image}`} alt="" />

                            <p className="text-2xl">{token.title} is yours!</p>

                            <p>It's good to know you won't go hungry you've got some FantomFood!</p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
