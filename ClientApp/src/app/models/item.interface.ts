export interface IItem {
  item_id: string;
  item_desc: string;
  item_class_id: string;
  uom_id: number;
  template: boolean;
  lifetime: number;
  unit_cost: number;
  obsolete: boolean;
  purchased: boolean;
  sold: boolean;
  num_decimals: number;
  must_complete_steps: boolean;
  must_prod_reqd_qty: boolean;
  min_grade: number;
  min_state: number;
  min_inv_level: number;
  reorder_amt: number;
  auto_reorder: boolean;
  lot_no_format: string;
  last_lot_no: string;
  max_lot_size: number;
  sublot_no_format: string;
  last_sublot_no: string;
  serial_no_lvl: number;
  max_sublot_size: number;
  max_order_size: number;
  min_trace_inv: number;
  inv_unique_by_job: boolean;
  notes: string;
  spare1: string;
  spare2: string;
  spare3: string;
  spare4: string;
  last_edit_comment: string;
  last_edit_by: string;
  last_edit_at: Date;
  row_id: number;
}
