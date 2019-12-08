const { Pagination, PaginationItem, PaginationLink } = Reactstrap;

class Paginator extends React.PureComponent {

    constructor() {

        super();

        // create data set of random length
        this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
        );

        this.pageSize = 50;
        this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize);

        this.state = {
            currentPage: 0
        };

    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

    }

    render() {

        const { currentPage } = this.state;

        return (

            <React.Fragment>

                <div className="pagination-wrapper">

                    <Pagination aria-label="Page navigation example">

                        <PaginationItem disabled={currentPage <= 0}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                            />

                        </PaginationItem>

                        {[...Array(this.pagesCount)].map((page, i) =>
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>

                            <PaginationLink
                                onClick={e => this.handleClick(e, currentPage + 1)}
                                next
                                href="#"
                            />

                        </PaginationItem>

                    </Pagination>

                </div>

                {this.dataSet
                    .slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                    )
                    .map((data, i) =>
                        <div className="data-slice" key={i}>
                            {data}
                        </div>
                    )}

            </React.Fragment>

        );

    }

}