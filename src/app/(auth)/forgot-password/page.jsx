// pages/forgot-password.js
import ForgotPasswordForm from '../_components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-indigo-500 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Círculos e losangos semitransparentes */}
          <div className="absolute top-16 left-44 h-36 w-36 bg-white opacity-20 rounded-full"></div>
          <div className="absolute bottom-32 right-10 h-24 w-24 bg-white opacity-20 rounded-full"></div>

          <div className="absolute top-10 right-10 h-20 w-20 bg-white opacity-20 transform rotate-45"></div>
          <div className="absolute bottom-20 left-72 h-28 w-28 bg-white opacity-20 transform rotate-45"></div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Forgot Password
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address to receive a password reset link.
              </p>
              <ForgotPasswordForm />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
