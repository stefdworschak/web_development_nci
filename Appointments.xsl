<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
				<table id="appointmentsTable">
					<tr>
						<th>Date</th>
						<th>Time</th>
						<th>Description</th>
						<th>Entered By</th>
						<th>Address</th>
						<th> </th>
					</tr>
					<xsl:for-each select="appointments/appointment">
							<tr id="trId{position()}">
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
							</tr>
					</xsl:for-each>
				</table>
	</xsl:template>
</xsl:stylesheet>
