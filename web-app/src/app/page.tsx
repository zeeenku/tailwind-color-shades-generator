import Banner from "@/components/banner";
import Header from "@/components/header";
import ShadesPreview from "@/components/shades-preview";
import Sidebar from "@/components/sidebar";
import UiExamples from "@/components/ui-examples";

export default function Home() {
  return (
    <main className="h-screen max-h-screen">
      <div className="fixed top-0 left-0 h-14 w-full z-20">
        <Header />
      </div>

      <div className="flex pt-14">

        <div className="w-64 fixed top-14 left-0 h-full">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64">

          <div className="flex">
            <div className="flex-1">
              <ShadesPreview />
            </div>

            <div className="w-60 sticky top-14 max-h-full h-[calc(100vh-3.5rem)]">
              <Banner />
            </div>
          </div>


          <div className="w-full">
            <UiExamples />
          </div>
        </div>
      </div>
    </main>
  );
}
