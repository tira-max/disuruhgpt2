// Simple PDF generation without external dependencies
export class SimplePDF {
  // Generate simple text-based report
  static generateReport(data: any[], title: string): string {
    let content = `${title}\n`
    content += `Generated: ${new Date().toLocaleString("id-ID")}\n`
    content += "=".repeat(50) + "\n\n"

    data.forEach((item, index) => {
      content += `${index + 1}. ${JSON.stringify(item, null, 2)}\n\n`
    })

    return content
  }

  // Generate HTML for PDF (can be printed as PDF from browser)
  static generateHTMLReport(data: any[], title: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; text-align: center; }
          .header { text-align: center; margin-bottom: 30px; }
          .item { margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; }
          .date { color: #666; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p class="date">Generated: ${new Date().toLocaleString("id-ID")}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td><pre>${JSON.stringify(item, null, 2)}</pre></td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="no-print" style="margin-top: 20px;">
          <button onclick="window.print()">Print PDF</button>
        </div>
      </body>
      </html>
    `
  }
}
