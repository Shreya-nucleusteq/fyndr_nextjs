import { ActionResponse } from "../global";
import { UpdateLocationParams } from "./location.params";
import { UpdateLocationResponse } from "./location.response";


export type UpdateLocationProps = (
  args: UpdateLocationParams
) => Promise<ActionResponse<UpdateLocationResponse>>;