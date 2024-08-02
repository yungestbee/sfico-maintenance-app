const sendEmail = require('../../utils/transport');

const sendMaintenanceMail = async (req, res, next) => {
 const company = req.company;
  const amount = req.amount;
  const duration = req.duration;
  const email = req.email;
  console.log(company);
  console.log(amount);
  console.log(duration);
  console.log(email);
  try {
    // const message = `Good day Sir/Madam,
    // Your maintenance agreement has been activated.
    // The duration of the agreement is ${duration} for ${amount}. We look forward to serve you better
    // Thanks ${company}`;

    const message = `Certainly! Here’s a draft for a formal email regarding the creation of a maintenance agreement between Sfico Limited and another company:

---

**Subject: **

Dear [Recipient's Name],

I hope this email finds you well.

I am writing to formally confirm the establishment of a maintenance agreement between Sfico Limited and [Company Name]. We are pleased to enter into this partnership and look forward to a mutually beneficial relationship.

**Details of the Agreement:**

- **Agreement Duration:** [Start Date] to [End Date]
- **Total Amount Paid:** $[Amount]

The agreement encompasses the following services:

1. [Service Detail 1]
2. [Service Detail 2]
3. [Service Detail 3]

Please find the attached document for the comprehensive details of the maintenance agreement. We kindly ask you to review the attached agreement and confirm your acceptance by signing and returning a copy at your earliest convenience.

Should you have any questions or require further information, please do not hesitate to contact me directly.

Thank you for choosing Sfico Limited. We are committed to providing you with exceptional service and support.

Best regards,

[Your Full Name]  
[Your Position]  
Sfico Limited  
[Your Contact Information]  
[Company Address]

**Attachments:**
- Maintenance Agreement Document

---

Feel free to modify the details as per your specific requirements.`;

    await sendEmail(
      email,
      `Confirmation of Maintenance Agreement Between Sfico Limited and ${company}`,
      message
    );
    return res
      .status(201)
      .json({ message: 'Company Profile Successfully Created' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = sendMaintenanceMail;
