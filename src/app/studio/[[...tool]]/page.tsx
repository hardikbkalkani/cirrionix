import {StudioClientPage} from "@/app/studio/[[...tool]]/studio-client-page";
import {StudioSetupState} from "@/app/studio/[[...tool]]/studio-setup-state";
import {isSanityConfigured} from "@/sanity/env";

export const dynamic = "force-static";

export {metadata, viewport} from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return <StudioSetupState />;
  }

  return <StudioClientPage />;
}
