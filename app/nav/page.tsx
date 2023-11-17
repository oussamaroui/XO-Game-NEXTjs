import Image from "next/image"

export default function Nav() {

    return (
        <section  id="sm">
            <div className='ml-2 mt-[-15px] absolute'>
                <p>Let&apos;s share our skills on : </p>
                <div className="w-28 flex justify-around ml-6 mt-2">
                    <a href="https://github.com/oussamaroui" target={'_blank'}>
                        <Image width="25" height="25" src="/Icons/icons8-github-100.png" alt="github" />
                    </a>
                    <a href="https://www.linkedin.com/in/oussama-roui" target={'_blank'}>
                        <Image width="25" height="25" src="/Icons/icons8-linkedin-100.png" alt="linkedin" />
                    </a>
                    <a href="https://twitter.com/oussama_roui" target={'_blank'}>
                        <Image width="25" height="25" src="/Icons/icons8-twitterx-100.png" alt="twitterx--v2" />
                    </a>
                </div>
            </div>
        </section>
    )
}
