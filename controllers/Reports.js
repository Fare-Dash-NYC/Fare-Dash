const { json } = require("express");
const db = require("../db");

// //get all reports in database
// async function getEveryReport(req, res) {
//   try {
//     const reports = await db.any("SELECT * FROM reports ORDER BY created_at DESC");
//     return res.json(reports);
//   } catch (err) {
//     res.status(500).send({message: err.message});
//   }
// }

//get all reports for a user
async function getuserReports(req, res) {
  const user_id = parseInt(res["user_id"], 10);

  try {
    const reports = await db.any(
      "SELECT * FROM reports WHERE user_id=$1",
      user_id
    );
    return res.json(reports);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//get specific report by id
async function getAReport(req, res) {
  const report_id = parseInt(req.params.report_id, 10);
  try {
    const report = await db.one("SELECT * FROM reports WHERE id = $1", report_id);
    res["report_id"] = report_id;
    return res.status(200).json(report);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
//create a report
async function createReport(req, res) {
  const id = parseInt(res.user_id, 10);
  const content = req.body.content;
  const info = {
    title: req.body.title,
    content: content,
    user_id: id,
  };

  try {
    const report = await db.one(
      "INSERT INTO reports (content, user_id, title) VALUES (${content},${user_id}, ${title}) RETURNING *",
      info
    );
    res["report_id"] = report.id;
    return res.status(200).json({ message: "sucessfully created" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//delete a report
async function deleteReport(req, res) {
  const report_id = parseInt(req.params.report_id, 10);
  try {

    await db.none("DELETE FROM reports where id = $1 AND user_id = $2", [report_id, res["user_id"]]);

    return res.status(200).json({ message: "Report Deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//update a report
async function updateReport(req, res) {
  const report_id = parseInt(req.params.report_id, 10);

  console.log(`report ID: ${report_id}`)

  try {
    const exists = await db.one('SELECT EXISTS(SELECT * FROM reports WHERE id = $1 and user_id = $2)', [
      report_id, res["user_id"]
    ])
    console.log(exists)

    if (exists) {

      await db.one("UPDATE reports SET content = $1 WHERE id = $2 RETURNING id", [
        req.body.content,
        report_id,
      ]);
      
      res[report_id] = report_id

      return res.status(200).json({ message: "updated report" });
    } else {
      return res.status(404).json({
        message: "Permission denied or report not found",
        error: err.message
      })
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
}

async function checkReportOwner(req, res) {

  try {

    const report_id = parseInt(req.params.report_id, 10);
  
    const isReportOwner = await db.one('SELECT EXISTS(SELECT * FROM reports WHERE id = $1 AND user_id = $2)', [report_id, res["user_id"]]);
  
    console.log("is user the report owner? ", isReportOwner)

    return res.status(200).json(isReportOwner)

    
  } catch (err) {

    return res.status(500).send({message: err.message})

  }
}

module.exports = {
  getAReport,
  getuserReports,
//   getEveryReport,
  createReport,
  updateReport,
  checkReportOwner,
  deleteReport,
};