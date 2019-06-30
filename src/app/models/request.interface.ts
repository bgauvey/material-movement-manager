export interface IRequest {
  req_date_local: Date;
  req_date_utc: Date;
  item_id: string;
  item_desc: string;
  qty_req: number;
  ent_id: number;
  ent_name: string;
  state_cd: number;
  state_desc: string;
  remarks: string;
  rework: boolean;
  requested_by: string;
  user_desc: string;
  uom_desc: string;
  pack_size: number;
  yard_location: string;
  last_edit_comment: string;
  last_edit_by: string;
  last_edit_at: Date;
  row_id: number;
}
