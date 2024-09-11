import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";

const Show = ({ data, isPostClicked, setIsPostClicked }) => (
  <Modal
    className="px-6 py-6"
    isOpen={isPostClicked}
    size="large"
    onClose={() => setIsPostClicked(false)}
  >
    <Typography className="text-blue-600" style="h3" weight="semibold">
      {data.title}
    </Typography>
    <Typography className="mt-2" style="h5" weight="normal">
      {data.author.name}
    </Typography>
    <Typography className="mt-4 max-h-64 overflow-auto bg-blue-50 p-2">
      {data.description}
    </Typography>
  </Modal>
);

export default Show;
