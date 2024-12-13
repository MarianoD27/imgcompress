import * as path from 'path'
import { join } from 'path'
import * as fs from "fs"
import { readdirSync } from 'fs'
import sharp from "sharp"
import inquirer from 'inquirer'
import { PathPrompt } from 'inquirer-path'
import { confirm, number } from '@inquirer/prompts'

import * as colors from 'colors'
import pad from "pad"
import boxen from "boxen"


inquirer.prompt.registerPrompt('path', PathPrompt)
const questions = [{ type: 'path', name: 'inPath', message: "Enter the input path. Press enter for default\n", default: path.resolve() }, { type: 'path', name: 'outPath', message: "Enter the output path. Press enter for default\n", default: path.resolve() }]


// const pathName = path.resolve();

export async function compressCommand(argv) {

  console.log(`\nWelcome to your Image Compresser by MarianoD27\n`.blue.bgBlack)

  const path = await getPaths()
  // console.log(path)
  const qual = await number({ message: 'Enter the quality you wish to use for the jpeg method.\n', max: 100, min: 40, default: 80 })
  //console.log(qual)
  const conf = await confirm({ message: "Continue?\n" })
  if (!conf) {
    return
  }

  console.log('')

  const files = readdirSync(path.inPath)
  files.forEach(
    file => {
      if ((file.endsWith('.png')) || file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp') || file.endsWith('.gif') || file.endsWith('.avif') || file.endsWith('.tiff') || file.endsWith('.svg')) {
        const filePath = join(path.inPath, file)
        const newPath = join(path.outPath, file)
        sharp.cache(false); //needed to rewrite
        sharp(filePath)
          .jpeg({ quality: qual })
          .toBuffer(function (err, buffer) {
            fs.writeFile(newPath, buffer, function (e) {
              if (e) {
                console.log(e)
              }
              console.log(`Done: ${file}`)
            })
          })
      }
    }
  )
  console.log('')
}

async function getPaths() {
  const res = await inquirer.prompt(questions);
  return res
}