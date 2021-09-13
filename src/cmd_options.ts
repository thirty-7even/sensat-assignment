import commandLineArgs, { CommandLineOptions } from 'command-line-args';
import fs from 'fs';

class CmdOptions {
    aggregate: boolean;
    box: string;
    from: Date;
    to: Date;
    configPath: string;

    constructor(options: CommandLineOptions)
    {
        this.aggregate = options.aggregate && options.aggregate == 'true' || false;
        this.box = options.box && options.box || undefined;
        this.from = options.from && new Date(options.from) || undefined;
        this.to = options.to && new Date(options.to) || undefined;
        this.configPath = options.conf && options.conf || undefined;

        // Check arguments, let user know if something is not right
        if (!this.aggregate)
        {
          if (!this.box)
            console.warn("Box id not provided, will pull data for all boxes.");
          if (!this.from)
            console.warn("'From' date: not provided or bad format. Resulting data will not have lower date limit.");
          if (!this.to)
            console.warn("'To' date: not provided or bad format. Resulting data will not have higher date limit.");
        }

        if (!this.configPath || !fs.existsSync(this.configPath))
        {
          console.info("Config file path not provided or file doesn't exist. Using default database config.");
        }
        else
        {
          if (this.configPath.split('.').pop() != 'yaml')
            console.info("Config file thould be in .yaml fromat. Using default database config.");
        }
    }
};

const optionDefinitions = 
[
  { name: 'aggregate', alias: 'a', type: String, multiple: false},
  { name: 'conf', alias: 'c', type: String, multiple: false},
  { name: 'box', alias: 'b', type: String, multiple: false},
  { name: 'from', alias: 'f', type: String, multiple: false},
  { name: 'to', alias: 't', type: String, multiple: false}
];

const options = commandLineArgs(optionDefinitions);

export const cmdOptions = new CmdOptions(options);