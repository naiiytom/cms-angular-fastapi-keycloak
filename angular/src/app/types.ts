export interface IFaqTypes {
    answer?: string;
    code?: string;
    creation_date?: Date;
    id?: string;
    modified_date?: Date;
    package_type?: string;
    plan_type?: string;
    policy_type?: string;
    question?: string;
    updated_by?: string;
    visible_state?: number;
}

export interface IKBTypes {
    id?: string;
    policy_type?: string;
    title?: string;
    text?: string;
    plan1?: string;
    plan2?: string;
    plan3?: string;
    plan4?: string;
    pic_url?: string;
    modified_date?: Date;
}

export interface ISynonymTypes {
    id?: string;
    synonym?: string;
    word?: string;
}

export interface IExportTypes {
    id?: string;
    document_name?: string;
    edited_date?: string;
    package_name?: string;
    type?: string;
    username?: string;
}

export interface IServerResponse {
    _shards?: Shards;
    hits?: Hits;
    timed_out?: boolean;
    took?: number;
}

export interface Shards {
    failed?: number;
    skipped?: number;
    successful?: number;
    total?: number;
}

export interface Hits {
    hits?: Hit[];
    max_score?: number;
    total?: Total;
}

export interface Hit {
    _id?: string;
    _index?: string;
    _score?: number;
    _source?: IFaqTypes | IKBTypes | ISynonymTypes | IExportTypes | any;
    _type?: string;
}

export interface Total {
    relation?: string;
    value?: number;
}

export interface IUploadRoutedData {
    filename?: string;
    data?: IFaqTypes[];
    package_name?: string;
}

export interface UploadResponse {
    status?: string;
    message?: string;
}

export interface ExportData {
    url?: string;
}
