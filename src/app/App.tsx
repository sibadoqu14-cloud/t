
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {Content} from './components/Content';
import {DetectTypeSelector} from './components/p2/detecttypeselector';
import {ExampleImages} from './components/p2/exampleimages';
import {ExtraModeControls} from './components/p2/extramodecontrols';
import {Prompt} from './components/p2/prompt';
import {SideControls} from './components/p2/sidecontrols';
import {TopBar} from './components/p2/topbar';
import {InitFinishedAtom, RequestJsonAtom, ResponseJsonAtom} from './components/atoms';

function JsonDisplay() {
  const [requestJson] = useAtom(RequestJsonAtom);
  const [responseJson] = useAtom(ResponseJsonAtom);

  return (
    <div className="flex flex-col w-1/2 p-4 gap-4 overflow-auto border-l h-full">
      <div className="flex flex-col h-1/2">
        <h2 className="text-sm font-bold mb-2 uppercase shrink-0">
          API Request
        </h2>
        <pre
          className="bg-[var(--input-color)] p-2 rounded-md overflow-auto text-xs grow"
          aria-live="polite">
          <code>
            {requestJson || 'Send a request to see the API call details here.'}
          </code>
        </pre>
      </div>
      <div className="flex flex-col h-1/2">
        <h2 className="text-sm font-bold mb-2 uppercase shrink-0">
          API Response
        </h2>
        <pre
          className="bg-[var(--input-color)] p-2 rounded-md overflow-auto text-xs grow"
          aria-live="polite">
          <code>{responseJson}</code>
        </pre>
      </div>
    </div>
  );
}

function App() {
  const [initFinished] = useAtom(InitFinishedAtom);

  useEffect(() => {
    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex grow flex-col border-b overflow-hidden">
        <TopBar />
        <div className="flex grow overflow-hidden">
          {initFinished ? <Content /> : null}
          <JsonDisplay />
        </div>
        <ExtraModeControls />
      </div>
      <div className="flex shrink-0 w-full overflow-auto py-6 px-5 gap-6 lg:items-start">
        <div className="flex flex-col lg:flex-col gap-6 items-center border-r pr-5">
          <ExampleImages />
          <SideControls />
        </div>
        <div className="flex flex-row gap-6 grow">
          <DetectTypeSelector />
          <Prompt />
        </div>
      </div>
    </div>
  );
}

export default App;