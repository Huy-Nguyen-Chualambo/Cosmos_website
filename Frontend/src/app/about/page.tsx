import Footer from "@/components/Footer";
import NavBar from "@/components/navbar";
import StarsBg from "@/components/stars_bg";

export default function About() {



    return (
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-16 lg:p-20 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)]">
            <NavBar />
            <StarsBg />

            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center w-full">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    About Us
                </h1>

                {/* Introduction Section */}
                <section className="w-full max-w-4xl">
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
                        <p className="text-xl text-center mb-4 text-blue-200">
                            Explore the Universe With Us
                        </p>
                        <p className="text-lg text-slate-300 mb-4">
                            Welcome to <span className="text-blue-300 font-semibold">Các Vì Tinh Tú</span> (The Stars), Vietnam's premier astronomy portal dedicated to bringing the wonders of the cosmos to everyone. Our website serves as a gateway to the universe, offering accessible astronomy content for enthusiasts of all levels.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="font-semibold text-blue-300 mb-2">Learn</p>
                                <p className="text-slate-300">Discover the mysteries of our universe through our educational resources</p>
                            </div>
                            <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="font-semibold text-blue-300 mb-2">Connect</p>
                                <p className="text-slate-300">Join our community of stargazers and astronomy enthusiasts</p>
                            </div>
                            <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                                <p className="font-semibold text-blue-300 mb-2">Explore</p>
                                <p className="text-slate-300">Navigate the night sky with our interactive tools and guides</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Contact Info */}
                <section className="w-full max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact Us</h2>
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <p className="text-center text-lg mb-4 text-blue-200">
                            We'd love to hear from you! Whether you have questions about astronomy, suggestions for our website, or are interested in collaborations.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6 text-center">
                            <div>
                                <p className="font-semibold text-blue-300">Email</p>
                                <p className="text-slate-300">contact@cacvitihntu.vn</p>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-300">Follow Us</p>
                                <p className="text-slate-300">@cacvitihntu</p>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-300">Location</p>
                                <p className="text-slate-300">Hanoi, Vietnam</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
           
        </div>
    );
}