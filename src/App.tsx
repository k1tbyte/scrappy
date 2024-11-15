import {ActionsPanel} from "@/components/ActionsPanel/ActionsPanel.tsx";
import {ModalsHost} from "@/components/primitives/Modal.tsx";
import {ScraperView} from "@/components/ScraperView/ScraperView.tsx";

function App() {
  return (
      <>
          <div className="grid grid-rows-1 h-full w-full max-w-full max-h-full"
          style={{gridTemplateColumns: "320px auto"}}>
              <ActionsPanel/>
              <ScraperView/>
          </div>
          <ModalsHost/>
      </>
  )
}

export default App
