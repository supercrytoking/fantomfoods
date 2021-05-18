import { Button } from '@geist-ui/react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import useSWR from 'swr'
import { useState } from 'react'
import SpaceAnimation from '../components/SpaceAnimation'
import Loader from '../components/Loader'
import BuyModal from '../components/BuyModal'

export default function App() {
    const { data: tokens } = useSWR('/api/tokens')
    const { data: price } = useSWR('/api/tokens/price')
    const [buy, setBuy] = useState(null)

    return (
        <>
            <Loader />

            <BuyModal visible={!!buy} hide={() => setBuy(false)} token={buy} />

            <div className="bg-black text-white">
                <SpaceAnimation id="random" />

                <motion.div transition={{ duration: 10 }} className="relative z-10">
                    <div className="max-w-5xl mx-auto px-12 py-24 space-y-16">
                        <div className="space-y-4 max-w-xl">
                            <h1 className="text-6xl md:text-7xl uppercase">Oh no!</h1>
                            <h2 className="text-4xl md:text-6xl">The fantomverse is running out of food!</h2>
                            <p className="text-3xl">
                                This wouldn't be such a huge problem if we we're faced with this truth: the food is very inexpensive, but it is very limited! Therefore, the only solution we have devised (outside of our
                                airdrop) to distribute the food fairly is to increase the cost of item each time a foodie is purchased!
                            </p>
                        </div>

                        {tokens && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {tokens.map((token, index) => (
                                    <Tilt className="flex flex-col rounded space-y-2 overflow-hidden">
                                        <div className="p-6 flex-1 flex items-center justify-center bg-white bg-opacity-10 ">
                                            <img className="h-32 pixelated" src={`/tokens/image/${token.image}`} alt="" />
                                        </div>
                                        <div className="bg-white bg-opacity-10 px-4 py-2 flex items-center">
                                            <div className="flex-1 space-x-1">
                                                <Button auto size="mini" onClick={() => setBuy(token._id)}>
                                                    Claim
                                                </Button>
                                                <Button auto size="mini" type="secondary">
                                                    Info
                                                </Button>
                                            </div>
                                            <div>{price?.price || '??'} FTM</div>
                                        </div>
                                    </Tilt>
                                ))}
                            </div>
                        )}

                        <div>
                            <p className="text-center">0xEd22151F71A9790f2Ddfa8ACd5D0A86711879908</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
