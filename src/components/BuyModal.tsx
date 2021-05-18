/* eslint-disable max-len */
import { Button, Collapse, Table, Modal } from '@geist-ui/react'
import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'
import useWallet from '../hooks/useWallet'

export default function CheckoutModal({ visible, hide, token: tokenId }) {
    const { connect, addresses } = useWallet()

    const { data: price } = useSWR('/api/tokens/price')
    const { data: token } = useSWR(tokenId ? `/api/tokens/${tokenId}` : null)

    const [status, setStatus] = useState('idle')

    const address = addresses[0]

    const transact = async () => {
        setStatus('loading')
        await window.web3.eth
            .sendTransaction({
                from: address,
                to: '0xc6A49635A022f6b797292a026cE0F712052336bf',
                value: window.web3.utils.toWei(price.price.toString())
            })
            // .on('transactionHash', (hash) => {
            //     // ...
            // })
            .on('receipt', async (receipt) => {
                // const { data } = await axios.post('/api/transact', { discord, receipt })
                setStatus('complete')
            })
            // .on('confirmation', (confirmationNumber, receipt) => {
            //     //
            // })
            .on('error', (e) => {
                setStatus('idle')
                console.error(e)
            })
    }

    const data = [
        { property: 'Health Factor', value: 'UNKNOWN' },
        { property: 'Poison Factor', value: 'UNKNOWN' },
        { property: 'Effects', value: 'UNKNOWN' },
        { property: '...', value: '' }
    ]
    return (
        <>
            <Modal open={visible} onClose={hide}>
                <Modal.Content>
                    {token && (
                        <>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    <div className="text-center py-12 space-y-4">
                                        <p>UID: {token._id}</p>
                                        <img className="block w-32 mx-auto pixelated" src={`/tokens/image/${token.image}`} alt="" />
                                        <p className="text-2xl">{token.title}</p>
                                    </div>
                                    <Collapse.Group>
                                        <Collapse title="Attributes" subtitle={`View all attributes if ${token.title}`}>
                                            <Table data={data}>
                                                <Table.Column prop="property" label="property" />
                                                <Table.Column prop="value" label="value" width={150} />
                                            </Table>
                                        </Collapse>
                                    </Collapse.Group>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button disabled={address} onClick={() => connect()} auto className="w-full">
                                            Connect Wallet
                                        </Button>
                                        <Button onClick={() => transact()} auto className="w-full" type="secondary" disabled={!address} loading={status === 'loading'}>
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Content>
            </Modal>
        </>
    )
}
