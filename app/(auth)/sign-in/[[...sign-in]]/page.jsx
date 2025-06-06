import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Hero Section */}
        <section className="relative flex h-32 items-end bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="hidden lg:relative lg:block lg:p-12 lg:z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">AI Interview Mocker</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Interview Skills
              </span>
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-blue-100">
              Practice with AI-powered mock interviews tailored to your role. Get instant feedback, 
              improve your confidence, and land your dream job.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">AI-powered personalized questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Real-time feedback and scoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100">Track progress over time</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-blue-200">Interviews Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-blue-200">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Sign In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-white">
          <div className="max-w-xl lg:max-w-3xl w-full">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-4xl">
                Welcome Back!
              </h2>

              <p className="mt-4 leading-relaxed text-gray-600 text-center">
                Sign in to continue your interview preparation journey and track your progress.
              </p>
            </div>

            {/* Sign In Component Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12">
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to continue your interview preparation journey.</p>
              </div>

              {/* Clerk Sign In Component */}
              <div className="flex justify-center">
                <SignIn 
                  appearance={{
                    elements: {
                      formButtonPrimary: 
                        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: 
                        "border-gray-200 hover:bg-gray-50 transition-colors duration-200",
                      formFieldInput: 
                        "border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                      footerActionLink: 
                        "text-blue-600 hover:text-blue-700 font-medium",
                    },
                  }}
                />
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">New to AI Interview Mocker?</h3>
                    <p className="text-blue-700 text-sm">
                      Create your free account to start practicing with personalized mock interviews 
                      and get detailed feedback to improve your skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
