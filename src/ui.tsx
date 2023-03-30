import {
  Banner,
  Button,
  Columns,
  Container,
  IconWarning32,
  Muted,
  render,
  Text,
  Textbox,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit, once } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import { ClusterTextualNodes, HandleError, SaveApiKey } from "./types";

function Plugin() {
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleClusterButtonClick = useCallback(
    function () {
      if (apiKey === "") {
        setError("API Key is required");

        return;
      }
      setError("");
      try {
        emit<ClusterTextualNodes>("CLUSTER_TEXTUAL_NODES");
      } catch (error: any) {
        setError(error.message);
      }
    },
    [apiKey]
  );

  const handleSaveApiKey = useCallback(
    function () {
      emit<SaveApiKey>("SAVE_API_KEY", apiKey);
    },
    [apiKey]
  );

  once<HandleError>("HANDLE_ERROR", setError);

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>OpenAI API Key</Muted>
      </Text>

      <VerticalSpace space="small" />
      <Columns space="extraSmall">
        <Textbox onValueInput={setApiKey} value={apiKey} variant="border" />
        <Button fullWidth onClick={handleSaveApiKey} secondary>
          Save
        </Button>
      </Columns>
      {error && (
        <Banner icon={<IconWarning32 />} variant="warning">
          {error}
        </Banner>
      )}

      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleClusterButtonClick}>
          Cluster
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
