import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Hero Section */}
        <section className="relative flex h-32 items-end bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="hidden lg:relative lg:block lg:p-12 lg:z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">AI Interview Mocker</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-tight">
              Start Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Success Journey
              </span>
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-purple-100">
              Join thousands of professionals who have improved their interview skills with our AI-powered platform. Get
              personalized feedback and land your dream job.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-purple-100">Unlimited practice interviews</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-purple-100">Detailed performance analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-purple-100">Industry-specific questions</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-white">Sarah Johnson</div>
                  <div className="text-purple-200 text-sm">Software Engineer at Google</div>
                </div>
              </div>
              <p className="text-purple-100 italic">
                "This platform helped me prepare for my dream job interview. The AI feedback was incredibly detailed and
                helped me improve my answers significantly!"
              </p>
            </div>
          </div>
        </section>

        {/* Right Side - Sign Up Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-white">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">Join AI Interview Mocker</h2>

              <p className="mt-4 leading-relaxed text-gray-600 text-center">
                Create your free account and start practicing with AI-powered mock interviews today.
              </p>
            </div>

            {/* Sign Up Component Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Start your interview preparation journey with AI-powered feedback.</p>
              </div>

              {/* Clerk Sign Up Component */}
              <div className="flex justify-center">
                <SignUp
                  appearance={{
                    elements: {
                      formButtonPrimary:
                        "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 transition-colors duration-200",
                      formFieldInput: "border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg",
                      footerActionLink: "text-purple-600 hover:text-purple-700 font-medium",
                    },
                  }}
                />
              </div>

              {/* Features Preview */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-purple-800 text-sm">Free Forever</span>
                  </div>
                  <p className="text-purple-700 text-xs">No credit card required</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-blue-800 text-sm">Secure & Private</span>
                  </div>
                  <p className="text-blue-700 text-xs">Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
