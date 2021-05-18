import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import SpaceAnimation from './SpaceAnimation'

export default function Loader() {
    const [hide, setHide] = useState(false)

    useEffect(() => setInterval(() => setHide(true), 4000), [])

    return (
        <>
            <AnimatePresence>
                {!hide && (
                    <motion.div exit={{ opacity: [1, 0] }} className="absolute z-50 inset-0 bg-black text-white">
                        <SpaceAnimation id="123" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                            <motion.div animate={{ scale: [0, 1] }} transition={{ duration: 4 }} className="text-center">
                                <p className="text-4xl">FANTOMFOODS</p>
                                <p className="text-xl">Loading...</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
