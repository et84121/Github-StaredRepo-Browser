import { Repository } from "@octokit/graphql-schema";
import { defineComponent, PropType, reactive } from "vue";
import { TableColumns } from "naive-ui/lib/data-table/src/interface";
const createColumns = (): TableColumns<Repository> => [
  {
    type: "expand",
    expandable: (_, index) => index !== 1,
    renderExpand: (rowData) => {
      return <p>{rowData.description}</p>;
    },
  },
  {
    title: "Name",
    key: "name",
    render(row) {
      return (
        <n-tooltip trigger="hover" placement="top-start">
          {{
            default: () => <p>{row.description}</p>,
            trigger: () => (
              <div class="flex flex-row gap-2 justify-between align-middle">
                <n-image
                  width="40"
                  object-fit="contain"
                  src={row.openGraphImageUrl}
                />
                {row.homepageUrl ? (
                  <a
                    class="hover:text-green-300 text-green-500 "
                    href={row.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.name}
                  </a>
                ) : (
                  <h3>{row.name}</h3>
                )}
              </div>
            ),
          }}
        </n-tooltip>
      );
    },
  },
  {
    title: "nameWithOwner",
    key: "nameWithOwner",
    render(row) {
      const [owner, name] = row.nameWithOwner.split("/");
      if (row.url) {
        return (
          <a
            class="hover:text-green-300 text-green-500"
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{owner}/</p>
            <p>{name}</p>
          </a>
        );
      } else {
        return (
          <h3>
            <p>{owner}/</p>
            <p>{name}</p>
          </h3>
        );
      }
    },
  },
  {
    title: "createdAt",
    key: "createdAt",
    render(row) {
      return <p>{new Date(row.createdAt).toLocaleDateString()}</p>;
    },
    defaultSortOrder: "ascend",
    sorter: "default",
  },
  {
    title: "updatedAt",
    key: "updatedAt",
    render(row) {
      return <p>{new Date(row.updatedAt).toLocaleDateString()}</p>;
    },
  },
  {
    title: "forkCount",
    key: "forkCount",
    defaultSortOrder: false,
    sorter: "default",
  },
  {
    title: "diskUsage",
    key: "diskUsage",
    defaultSortOrder: false,
    sorter: "default",
  },
  {
    title: "stargazerCount",
    key: "stargazerCount",
    defaultSortOrder: false,
    sorter: "default",
  },
];

export default defineComponent({
  name: "RepoProfile",
  props: {
    repos: {
      type: Array as PropType<Repository[]>,
      required: true,
    },
  },
  setup(props) {
    const columns = reactive(createColumns());

    const pagination = reactive({
      page: 1,
      pageSize: 100,
      pageSizes: [10, 50, 100, 500],
      showSizePicker: true,
      onChange: (page: number) => {
        pagination.page = page;
      },
      onPageSizeChange(pageSize: number) {
        pagination.pageSize = pageSize;
        pagination.page = 1;
      },
    });

    return {
      columns,
      tableData: props.repos.map((r, index) => ({ key: index, ...r })),
      pagination,
    };
  },
  render() {
    return (
      <n-data-table
        columns={this.columns}
        data={this.tableData}
        pagination={this.pagination}
        scroll-x="1200"
        max-height="100%"
        virtual-scroll
      />
    );
  },
});
