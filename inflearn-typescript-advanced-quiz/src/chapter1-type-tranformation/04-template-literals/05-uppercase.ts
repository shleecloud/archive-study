import {Equal, Expect } from "../../helper";

type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys = unknown;

type tests = [
    Expect<
        Equal<
            ObjectOfKeys,
            {
                LOG_IN: string;
                LOG_OUT: string;
                SIGN_UP: string;
            }
        >
    >,
];
