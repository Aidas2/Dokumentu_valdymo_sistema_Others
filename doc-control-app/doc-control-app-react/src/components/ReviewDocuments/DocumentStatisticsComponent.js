import React from 'react';
import DocumentStatisticsChart from './DocumentStatisticsChart';

const DocumentStatisticsComponent = (props) => {
    var statisticsCardList = props.statisticsData.map((item, index) => {
        return (
            <DocumentStatisticsChart
                //v-for="list of charts"
                key={item.documentTypeTitle}
                idName={"docType" + index}
                documentType={item.documentTypeTitle}
                submitted={item.submittedCount}
                accepted={item.approvedCount}
                rejected={item.rejectedCount}
            />
        );
    })
    return (
        <div className="col-6">
                <div>
                {/* Originalus <div className="card"> */}
                    {/* <div className="card-header">
                <h6 className="text-uppercase mb-0">{props.documentType}</h6> 
            </div> */}
                    <div>
                    {/* Originalus <div className="card-body"> */}
                        {statisticsCardList}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default DocumentStatisticsComponent;