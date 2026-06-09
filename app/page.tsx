import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="px-[5%] py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm">
              DoD
            </div>
            <div>
              <p className="font-bold text-blue-900 text-sm">U.S. Department of Defense</p>
              <p className="text-gray-500 text-xs">Office of Local Defense Community Cooperation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <button className="px-6 py-2 border border-blue-700 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                Register Business
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="w-full bg-blue-900 text-white px-[5%] py-16">
        <div className="max-w-3xl">
          <p className="text-blue-300 text-sm font-medium mb-3 uppercase tracking-wide">
            U.S. Department of Defense Portal
          </p>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Business Registration & Grant Management Portal
          </h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Register your business, manage grant applications, and collaborate with the U.S. Department of Defense Office of Local Defense Community Cooperation.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/register">
              <button className="px-8 py-3 bg-white text-blue-900 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                Start Registration →
              </button>
            </Link>
            <Link href="/profile">
              <button className="px-8 py-3 border border-white text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="px-[5%] py-8 grid grid-cols-4 gap-6">
          {[
            { number: "2,400+", label: "Registered Businesses" },
            { number: "$1.2B", label: "Grants Awarded" },
            { number: "50+", label: "Defense Programs" },
            { number: "98%", label: "Application Success Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-blue-900">{stat.number}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="w-full px-[5%] py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: "📋",
              title: "Easy Registration",
              description: "Complete your business registration in 3 simple steps. Our streamlined process saves you time and effort.",
              color: "bg-blue-50",
              iconColor: "bg-blue-100",
            },
            {
              icon: "🔒",
              title: "Secure & Reliable",
              description: "Your data is protected with enterprise-grade security. We ensure your information is always safe.",
              color: "bg-green-50",
              iconColor: "bg-green-100",
            },
            {
              icon: "📊",
              title: "Track Applications",
              description: "Monitor the status of your grant applications in real-time through your personal dashboard.",
              color: "bg-orange-50",
              iconColor: "bg-orange-100",
            },
            {
              icon: "💼",
              title: "Grant Management",
              description: "Access and manage all your defense grants from one centralized location.",
              color: "bg-purple-50",
              iconColor: "bg-purple-100",
            },
            {
              icon: "🤝",
              title: "Community Support",
              description: "Connect with other businesses and get support from our dedicated team of advisors.",
              color: "bg-yellow-50",
              iconColor: "bg-yellow-100",
            },
            {
              icon: "⚡",
              title: "Fast Processing",
              description: "Our automated system ensures your applications are processed quickly and efficiently.",
              color: "bg-red-50",
              iconColor: "bg-red-100",
            },
          ].map((feature) => (
            <div key={feature.title} className={`${feature.color} rounded-xl p-6 border border-gray-100`}>
              <div className={`w-12 h-12 ${feature.iconColor} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="w-full bg-white px-[5%] py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { step: "01", title: "Create Your Profile", description: "Set up your business profile with your organization details and contact information." },
            { step: "02", title: "Register Your Business", description: "Complete the 3-step business registration wizard with your business details and board of directors." },
            { step: "03", title: "Submit & Track", description: "Submit your application and track its progress through your personal dashboard." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full bg-blue-900 text-white px-[5%] py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of businesses already registered with the U.S. Department of Defense portal.
        </p>
        <Link href="/register">
          <button className="px-10 py-3 bg-white text-blue-900 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
            Register Your Business Today →
          </button>
        </Link>
      </div>

      {/* FOOTER */}
      <div className="w-full bg-gray-900 text-gray-400 px-[5%] py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
              DoD
            </div>
            <p className="text-sm">U.S. Department of Defense — Office of Local Defense Community Cooperation</p>
          </div>
          <p className="text-xs">© 2024 All rights reserved</p>
        </div>
      </div>

    </div>
  );
}