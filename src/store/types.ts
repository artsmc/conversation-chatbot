export interface TranscriptMessage {
    speaker: string;
    token: string;
    date: Date;
    transcript: string;
}

export interface Transcript {
    messages: TranscriptMessage[];
}

export interface INote {
    vapi_call_id: string;
    session_name?: string;
    note:{
        summary:string,
        key_takeaways:string,
        tasks:string[],
        questions:string[]
    }
}

export interface INotes {
    vapi_call_id: string;
    session_name?: string;
    note?: INote;
}