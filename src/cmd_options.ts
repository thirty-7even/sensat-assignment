import commandLineArgs, { CommandLineOptions } from 'command-line-args';

class CmdOptions {
    aggregate: boolean;
    box: string;
    from: Date;
    to: Date;

    constructor(options: CommandLineOptions)
    {
        this.aggregate = options.aggregate && options.aggregate == 'true' || false;
        this.box = options.box && options.box || undefined;
        this.from = options.from && new Date(options.from) || undefined;
        this.to = options.to && new Date(options.to) || undefined;
    }
};

const optionDefinitions = 
[
  { name: 'aggregate', alias: 'a', type: String, multiple: false},
  { name: 'box', alias: 'b', type: String, multiple: false},
  { name: 'from', alias: 'f', type: String, multiple: false},
  { name: 'to', alias: 't', type: String, multiple: false}
];

const options = commandLineArgs(optionDefinitions);

export const cmdOptions = new CmdOptions(options);