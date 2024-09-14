import SigninForm from '../_components/SigninForm';
import SideImage from '../_components/SideImage';

export default function SignInPage() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <SideImage />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SigninForm />
        </main>
      </div>
    </section>
  );
}
