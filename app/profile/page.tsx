import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "Sarah Johnson",
    role: "City Administrator",
    location: "Newport News",
    email: "s.johnson@newportnews.gov",
    phone: "(757) 926-8400",
    organization: "City of Newport News",
    title: "City Administrator",
    department: "City Management",
    orgType: "Municipal Government",
    address: "2400 Washington Ave",
    city: "Newport News",
    state: "Virginia",
    zip: "23607",
    duns: "079859754",
    initials: "SJ",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="w-full bg-white border-b border-gray-200 px-[5%] py-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span>
          <span>›</span>
          <span className="text-blue-700 font-medium">My Profile</span>
        </div>
      </div>

      {/* PAGE BODY — full width, 5% padding */}
      <div className="w-full px-[5%] py-[2%]">
        <div className="flex gap-6 min-h-screen">

          {/* SIDEBAR — 20% width */}
          <div style={{width: "20%", flexShrink: 0}}>
            <div className="bg-white border border-gray-200 rounded-xl h-full p-6">
              <h2 className="font-bold text-gray-900 text-base mb-4">Account Management</h2>
              <nav className="flex flex-col gap-1">
                {[
                  { label: "Profile Information", icon: "👤", active: true },
                  { label: "My Applications", icon: "📄" },
                  { label: "Application Status", icon: "📊" },
                  { label: "Notifications", icon: "🔔" },
                  { label: "Documents", icon: "📁" },
                  { label: "Settings", icon: "⚙️" },
                ].map((item) => (
                  <div key={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-700"
                        : "text-gray-600 hover:bg-blue-600 hover:text-white"
                    }`}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT — 80% width */}
          <div style={{width: "80%"}} className="flex flex-col gap-6">

            {/* PROFILE CARD */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl font-bold">
                    {user.initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✎</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-sm text-gray-500">{user.role}, {user.location}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">✉ {user.email}</span>
                    <span className="text-sm text-gray-500">📞 {user.phone}</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* PERSONAL INFORMATION */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">First Name</label>
                  <input type="text" defaultValue="Sarah"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                  <input type="text" defaultValue="Johnson"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                  <input type="email" defaultValue={user.email}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                  <input type="text" defaultValue={user.phone}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Organization</label>
                  <input type="text" defaultValue={user.organization}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Title/Position</label>
                  <input type="text" defaultValue={user.title}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Department</label>
                  <input type="text" defaultValue={user.department}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* ORGANIZATION DETAILS */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">Organization Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Organization Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option>Municipal Government</option>
                    <option>Federal Agency</option>
                    <option>State Government</option>
                    <option>Non-Profit</option>
                    <option>Private Sector</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Address</label>
                  <input type="text" defaultValue={user.address}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City</label>
                  <input type="text" defaultValue={user.city}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">State</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                    <option>Virginia</option>
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    <option>Florida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">ZIP Code</label>
                  <input type="text" defaultValue={user.zip}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">DUNS Number</label>
                  <input type="text" defaultValue={user.duns}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm">?</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">New Application</p>
                    <p className="text-xs text-gray-500">Start a new grant application</p>
                  </div>
                </div>
                <Link href="/register">
                  <button className="w-full py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                    Start Application
                  </button>
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">⏰</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Recent Activity</p>
                    <p className="text-xs text-gray-500">View latest updates</p>
                  </div>
                </div>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  View Activity
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 text-sm">🎧</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Support</p>
                    <p className="text-xs text-gray-500">Get help with applications</p>
                  </div>
                </div>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* SAVE AND CANCEL BUTTONS */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel Changes
              </button>
              <button className="px-6 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}