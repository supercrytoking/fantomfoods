import useSWR from 'swr'
import { Parallax, Background } from 'react-parallax'
import Tilt from 'react-parallax-tilt'
import { Button, ButtonGroup } from '@geist-ui/react'
import ParticlesLayer from '../components/ParticlesLayer'
import SpaceAnimation from '../components/SpaceAnimation'

export default function App() {
    const { data: tokens } = useSWR('/api/tokens')
    return (
        <div className="bg-black text-white">
            <SpaceAnimation />
            <div className="relative z-10">
                <div className="max-w-5xl mx-auto px-12 py-24 space-y-16">
                    <div className="space-y-4 max-w-xl">
                        <h1 className="text-7xl uppercase">Oh no!</h1>
                        <h2 className="text-6xl">The fantomverse is running out of food!</h2>
                        <p className="text-3xl">
                            This wouldn't be such a huge problem if we we're faced with this truth: the food is very inexpensive, but it is very limited! Therefore, the only solution we have devised (outside of our
                            airdrop) to distribute the food fairly is to increase the cost of item each time a foodie is purchased!
                        </p>
                    </div>

                    {tokens && (
                        <div className="grid grid-cols-4 sm:grid-cols:6 gap-6">
                            {tokens.map((token, index) => (
                                <Tilt className="flex flex-col rounded space-y-2 overflow-hidden">
                                    <div className="p-6 flex-1 flex items-center justify-center bg-white bg-opacity-10 ">
                                        <img className="h-16 pixelated" src={`/tokens/image/${token.image}`} alt="" />
                                    </div>
                                    <div className="bg-white bg-opacity-10 px-4 py-2 flex items-center">
                                        <div className="flex-1">
                                            <Button auto size="mini" type="secondary">
                                                Claim
                                            </Button>
                                        </div>
                                        <div>10.00 FTM</div>
                                    </div>
                                </Tilt>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
