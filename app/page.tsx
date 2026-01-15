import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">OpenHouse</h1>
            <nav className="flex gap-4">
              <Link href="/auth/signin" className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Connect Volunteers with Meaningful Opportunities
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                OpenHouse is a comprehensive platform that helps organizations manage volunteers,
                coordinate events, and track impact - all in one place.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/events"
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose OpenHouse?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">📅</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Event Management</h4>
                <p className="text-gray-700">
                  Create and manage volunteer events with ease. Track registrations,
                  send reminders, and manage capacity.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Volunteer Profiles</h4>
                <p className="text-gray-700">
                  Build detailed volunteer profiles with skills, interests, and
                  availability to match the right people with the right opportunities.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">⏱️</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Hours Tracking</h4>
                <p className="text-gray-700">
                  Automatically track volunteer hours and generate reports to
                  demonstrate your organization's impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join our community of volunteers and organizations making an impact.
            </p>
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg inline-block"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} OpenHouse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
