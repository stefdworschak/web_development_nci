<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
				  table {
				    border-collapse: collapse;
						border:1px solid darkgray;
				  }	
				  th {
				    font-weight: bold;
				  }
			  </style>
			</head>
			<body>
				<table>
					<tr>
						<th>Date</th>
						<th>Time</th>
						<th>Description</th>
						<th>Entered By</th>
						<th>Address</th>
						<th> </th>
					</tr>
					<xsl:for-each select="appointments/appointment">
							<tr>
								<td>
									<xsl:value-of select="date"/>
								</td>
								<td>
									<xsl:value-of select="time"/>
								</td>
								<td>
									<xsl:value-of select="what"/>
								</td>
								<td>
									<xsl:value-of select="full_name"/>
								</td>
								<td>
									<xsl:value-of select="where"/>
								</td>
								<td>
									<button><span class="glyphicon glyphicon-trash">
									</span></button>
								</td>
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
