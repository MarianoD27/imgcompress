#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'

import * as colors from 'colors'

import { compressCommand } from "./utils.js";


const argv = yargs(hideBin(process.argv))
  .usage("\nimgcomp <options>".blue)
  .help()
  .alias('h', 'help')
  .showHelpOnFail(true)
  .demandCommand().recommendCommands().strict()
  .command({
    command: "c",
    describe: "Compress images",
    handler: function (argv) {
      compressCommand(argv)
    }
  })
  .argv