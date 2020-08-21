vocab = {
    vocab: "somethimg",
    meaning: {
        verb: {
            "mean as verb1": ["sen1", "sen2"],
            "mean as verb2": ["sen1", "sen2"]
        },
        noun: {
            "mean as noun1": ["sen1", "sen2"],
            "mean as noun2": ["sen1", "sen2"]
        }
    }
};

vocab = {
    vocab: "somethimg",
    meaning: [
        {
            verb: {
                "mean as verb1": ["sen1", "sen2"],
                "mean as verb2": ["sen1", "sen2"]
            }
        },
        {
            noun: {
                "mean as noun1": ["sen1", "sen2"],
                "mean as noun2": ["sen1", "sen2"]
            }
        }
    ]
};

new Promise(resolve => {
    resolve("a");
    Promise.resolve().then(() => console.log("b"));
}).then(x => console.log(x));

console.log("c");
