import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import carbone from "carbone";
import { DocxImager } from "docximager";
import fs from "fs";
// import docxtemplater from 'docxtemplater'

export default class IndexController {
  public async index({ response }: HttpContextContract) {
    var data = {
      sender_name: "Dipanjan Panja",
      company_name: "Geogo",
      address: "lowada",
      pin: "721136",
      city: "paschim medinipur",
      state: "wb",
      // image: "",
      date: "09-08-9090",
      title: "this is a demo title",
      name: "Geogo Name",
      company_address: "kolkata",
      company_pin: "700092",
      company_state: "wb",
    };
    var options = {
      //   convertTo: "pdf",
    };
    const pdf = await new Promise((resolve, reject) => {
      carbone.render(
        __dirname + "../../../../public/template.docx",
        data,
        options,
        function (err, result) {
          if (err) {
            reject(err);
            return console.log(err);
          }
          // write the result
          fs.writeFileSync("result.docx", result);
          console.log(result);
          resolve(result);
        }
      );
    });

    let docxImager = new DocxImager();

    await docxImager.load("./result.docx");
    // await docxImager
    await docxImager.insertImage({
      img1: "https://images.unsplash.com/photo-1660540055938-1e92201bacc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    });
    await docxImager.save("./result.docx");

    // docxtemplater.;

    response.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    response.send(pdf);
  }
}
