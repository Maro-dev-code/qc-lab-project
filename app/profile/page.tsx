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
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pl-64 py-[var(--spacing-8)] border-b border-[var(--color-border-light)] bg-white px-8">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-500)]">
          <span>Home</span>
          <span>›</span>
          <span className="text-[var(--color-primary-600)] font-medium">My Profile</span>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="flex items-stretch min-h-[calc(100vh-130px)] ml-0 w-full">

        {/* SIDEBAR — touches left edge, full height */}
        <div className="w-64 flex-none bg-white border-r border-[var(--color-border-light)]">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-24)] p-[var(--spacing-32)]">

          {/* PROFILE CARD */}
          <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-24)] flex items-center justify-between">
            <div className="flex items-center gap-[var(--spacing-16)]">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white text-xl font-bold">
                  {user.initials}
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-[var(--color-primary-500)] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✎</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--color-text-900)]">
                  {user.name}
                </h1>
                <p className="text-sm text-[var(--color-text-500)]">
                  {user.role}, {user.location}
                </p>
                <div className="flex items-center gap-[var(--spacing-16)] mt-[var(--spacing-4)]">
                  <span className="text-sm text-[var(--color-text-500)]">
                    ✉ {user.email}
                  </span>
                  <span className="text-sm text-[var(--color-text-500)]">
                    📞 {user.phone}
                  </span>
                </div>
              </div>
            </div>
            <button className="px-[var(--spacing-16)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors">
              Edit Profile
            </button>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-24)]">
            <h2 className="text-base font-bold text-[var(--color-text-900)] mb-[var(--spacing-20)]">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-[var(--spacing-16)]">
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">First Name</label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Last Name</label>
                <input
                  type="text"
                  defaultValue="Johnson"
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Email Address</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Phone Number</label>
                <input
                  type="text"
                  defaultValue={user.phone}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Organization</label>
                <input
                  type="text"
                  defaultValue={user.organization}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Title/Position</label>
                <input
                  type="text"
                  defaultValue={user.title}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Department</label>
                <input
                  type="text"
                  defaultValue={user.department}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
            </div>
          </div>

          {/* ORGANIZATION DETAILS */}
          <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-24)]">
            <h2 className="text-base font-bold text-[var(--color-text-900)] mb-[var(--spacing-20)]">
              Organization Details
            </h2>
            <div className="grid grid-cols-2 gap-[var(--spacing-16)]">
              <div className="col-span-2">
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Organization Type</label>
                <select className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)] bg-white">
                  <option>Municipal Government</option>
                  <option>Federal Agency</option>
                  <option>State Government</option>
                  <option>Non-Profit</option>
                  <option>Private Sector</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">Address</label>
                <input
                  type="text"
                  defaultValue={user.address}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">City</label>
                <input
                  type="text"
                  defaultValue={user.city}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">State</label>
                <select className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)] bg-white">
                  <option>Virginia</option>
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                  <option>Florida</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">ZIP Code</label>
                <input
                  type="text"
                  defaultValue={user.zip}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-500)] mb-[var(--spacing-4)]">DUNS Number</label>
                <input
                  type="text"
                  defaultValue={user.duns}
                  className="w-full border border-[var(--color-border-medium)] rounded-[var(--radius-8)] px-[var(--spacing-12)] py-[var(--spacing-8)] text-sm text-[var(--color-text-900)] focus:outline-none focus:border-[var(--color-primary-500)]"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM CARDS */}
          <div className="grid grid-cols-3 gap-[var(--spacing-16)]">
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-20)]">
              <div className="flex items-center gap-[var(--spacing-12)] mb-[var(--spacing-8)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-info-100)] flex items-center justify-center">
                  <span className="text-[var(--color-info-600)] text-sm">?</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-900)]">New Application</p>
                  <p className="text-xs text-[var(--color-text-500)]">Start a new grant application</p>
                </div>
              </div>
              <Link href="/register">
                <button className="w-full py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors">
                  Start Application
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-20)]">
              <div className="flex items-center gap-[var(--spacing-12)] mb-[var(--spacing-8)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                  <span className="text-[var(--color-success-600)] text-sm">⏰</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-900)]">Recent Activity</p>
                  <p className="text-xs text-[var(--color-text-500)]">View latest updates</p>
                </div>
              </div>
              <button className="w-full py-[var(--spacing-8)] border border-[var(--color-border-medium)] text-[var(--color-text-700)] rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-50)] transition-colors">
                View Activity
              </button>
            </div>
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-border-light)] p-[var(--spacing-20)]">
              <div className="flex items-center gap-[var(--spacing-12)] mb-[var(--spacing-8)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-warning-100)] flex items-center justify-center">
                  <span className="text-[var(--color-warning-600)] text-sm">🎧</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-900)]">Support</p>
                  <p className="text-xs text-[var(--color-text-500)]">Get help with applications</p>
                </div>
              </div>
              <button className="w-full py-[var(--spacing-8)] border border-[var(--color-border-medium)] text-[var(--color-text-700)] rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-50)] transition-colors">
                Contact Support
              </button>
            </div>
          </div>

          {/* SAVE AND CANCEL BUTTONS */}
          <div className="flex justify-end gap-[var(--spacing-12)]">
            <button className="px-[var(--spacing-24)] py-[var(--spacing-8)] border border-[var(--color-border-medium)] text-[var(--color-text-700)] rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-50)] transition-colors">
              Cancel Changes
            </button>
            <button className="px-[var(--spacing-24)] py-[var(--spacing-8)] bg-[var(--color-primary-600)] text-white rounded-[var(--radius-8)] text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors">
              Save Changes
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}