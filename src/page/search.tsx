import { RequestBuilder } from "@snort/system";
import { useRequestBuilder } from "@snort/system-react";
import { useLocation, useParams } from "react-router-dom";
import { TorrentKind } from "../const";
import { TorrentList } from "../element/torrent-list";
import { useRelays } from "../relays";

export function SearchPage() {
  const params = useParams();
  const location = useLocation();
  const term = params.term as string | undefined;
  const q = new URLSearchParams(location.search ?? "");
  const tags = q.get("tags")?.split(",") ?? [];
  const iz = q.getAll("i");
  const { relays } = useRelays();

  const rb = new RequestBuilder("search");
  const f = rb.withFilter().relay(["wss://relay.nostr.band", "wss://relay.noswhere.com", ...relays]);
  if (term || tags.length > 0 || iz.length > 0) {
    f.kinds([TorrentKind]).limit(100);
  }
  if (term) {
    f.search(term);
  }
  if (tags.length > 0) {
    f.tag("t", tags);
  }
  if (iz.length > 0) {
    f.tag("i", iz);
  }

  const data = useRequestBuilder(rb);

  return (
    <div className="flex flex-col gap-4">
      <h2>Search Results</h2>
      <TorrentList items={data} />
    </div>
  );
}
