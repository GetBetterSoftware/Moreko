import Image from 'next/image';
import { colors } from './colors';


export default function About() {
    return (
        <div className={`bg-[#F9F9F9] max-w-[1440px] max-h-[900px] w-full h-140  flex flex-row justify-center items-center gap-20`}>
            <div className={`bg-[#B12B24] w-70 h-100 flex justify-center`}>
                <Image src="/images/about.png" alt="profile" width={285} height={220} />
            </div>
            <div className={`bg-[#F9F9F9] w-200 h-100`}>
                <h2 className={`text-5xl font-bold flex justify-center`}>About Our School</h2>
                <p className={`text-1xl mt-5 flex justify-center`}>We, at Moreko High School offer supportive and inspirational environments for young enquiring minds to learn and grow with us. Our passion for learning means we achieve more than outstanding results. We strive to build confident and creative thinkers and aim at delivering an education that is truly relevant to their future. </p>
                <p className={`text-1xl mt-5 flex justify-center`}>We are a school that is focused on social-emotional development and early literacy and numeracy. Our students walk out with the character and confidence to make their mark in the world, equipped with the knowledge and real-world skills that take them way ahead in the industry they may serve.</p>
            </div>
        </div>
    )
}