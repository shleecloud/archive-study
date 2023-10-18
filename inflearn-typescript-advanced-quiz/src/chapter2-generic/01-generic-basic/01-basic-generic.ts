import {Equal, Expect} from "../../helper";

const returnWhatIPassIn = (t: unknown) => {
    return t;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
