import Banner from "@/components/banner";
import Header from "@/components/header";
import ShadesPreview from "@/components/shades-preview";
import Sidebar from "@/components/sidebar";
import UiExamples from "@/components/ui-examples";

export default function Home() {
  return (
    <main className="max-h-screen h-screen">
      
      <section className="h-14">
        <section className="fixed top-0 left-0 w-screen z-20"> 
          <Header /> 
        </section>
      </section>


      <section className="flex justify-start">
      
        <section className="w-[22rem]">
          <section className="fixed top-14 left-0 h-full w-[22rem]"> 
            <Sidebar/>
          </section>
        </section>


{/* donno why there is an extra 1rem here */}
        <section className="w-[calc(100vw-23rem)]">

          <section className="flex w-full max-h-full">
            <section className="w-[calc(100%-15rem)]">
              <ShadesPreview/>
            </section>

            <section className="w-60 max-h-full h-[calc(100vh-3.5rem)] sticky top-14">
              <Banner/>
            </section>
          </section>

          <section className="w-full">
            <UiExamples/>
          </section>

        </section>
  
      </section>
    </main>
  );
}
