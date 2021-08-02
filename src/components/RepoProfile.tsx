import { Repository } from "@octokit/graphql-schema";
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { TableColumns } from "naive-ui/lib/data-table/src/interface";
import { formatBytes } from "@/composables";
import { useMainStore } from "@/store";

const createColumns = (): TableColumns<Repository> => [
  {
    type: "expand",
    expandable: (_, index) => index !== 1,
    renderExpand: (rowData) => {
      return <p>{rowData.description}</p>;
    },
  },
  {
    title() {
      return (
        <n-tooltip trigger="hover" placement="top-start">
          {{
            default: () => <p>RepoName</p>,
            trigger: () => <h3>Name</h3>,
          }}
        </n-tooltip>
      );
    },
    key: "name",
    render(row) {
      return (
        <n-tooltip trigger="hover" placement="top-start">
          {{
            default: () => <p>{row.description}</p>,
            trigger: () => (
              <div class="flex flex-row gap-2 justify-between align-middle">
                <n-avatar
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
    defaultSortOrder: false,
    sorter: "default",
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
    render(row) {
      return <p>{row.diskUsage ? formatBytes(row.diskUsage) : "無資料"}</p>;
    },
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
    const searchStr = ref("");
    const store = useMainStore();
    const repos = store.staredRepos;

    function getTimeBound(repos: Repository[], prop: keyof Repository) {
      const min = Math.min(...repos.map((r) => new Date(r[prop]).getTime()));
      const max = Math.max(...repos.map((r) => new Date(r[prop]).getTime()));
      return [min, max];
    }

    const defaultCreateDateFilterRange = {
      ALL: getTimeBound(repos, "createdAt"),
    };
    const defaultUpdateDateFilterRange = {
      ALL: getTimeBound(repos, "updatedAt"),
    };
    const createDateFilterRange = ref(getTimeBound(repos, "createdAt"));
    const updateDateFilterRange = ref(getTimeBound(repos, "updatedAt"));
    const createdDateDisabled = function (ts: number) {
      const [min, max] = getTimeBound(repos, "createdAt");
      return ts < min || ts > max;
    };
    const updatedDateDisabled = function (ts: number) {
      const [min, max] = getTimeBound(repos, "updatedAt");
      return ts < min || ts > max;
    };

    const columns = reactive(createColumns());

    const pagination = reactive({
      page: 1,
      pageSize: 100,
      pageSizes: [10, 20, 30, 50, 100, 500],
      showSizePicker: true,
      onChange: (page: number) => {
        pagination.page = page;
      },
      onPageSizeChange(pageSize: number) {
        pagination.pageSize = pageSize;
        pagination.page = 1;
      },
    });

    function getTime(ts: string) {
      return new Date(ts).getTime();
    }

    const tableData = ref<Repository[]>([]);
    watchEffect(() => {
      tableData.value = repos
        .map((r, index) => ({ key: index, ...r }))
        .filter((repo) => {
          const [min, max] = createDateFilterRange.value;
          return getTime(repo.createdAt) > min && getTime(repo.createdAt) < max;
        })
        .filter((repo) => {
          const [min, max] = updateDateFilterRange.value;
          return getTime(repo.updatedAt) > min && getTime(repo.updatedAt) < max;
        });
    });

    return {
      columns,
      tableData,
      pagination,
      searchStr,
      createDateFilterRange,
      updateDateFilterRange,
      createdDateDisabled,
      updatedDateDisabled,
      defaultCreateDateFilterRange,
      defaultUpdateDateFilterRange,
    };
  },
  render() {
    return (
      <div>
        <div class="my-3 border-gray-500 rounded-md">
          <h3 class="text-left text-3xl font-bold">表格控制</h3>
          <div class="flex flex-row gap-3">
            <div class="my-2 w-1/3">
              <p class="text-left mb-1 text-lg">搜尋</p>
              <n-input
                v-model={[this.searchStr, "value"]}
                type="input"
                placeholder="搜你想搜的"
              />
            </div>
            <div class="w-1/2">
              <n-tabs type="line">
                <n-tab-pane name="Created" tab="Created Date Filter">
                  <n-date-picker
                    v-model={[this.createDateFilterRange, "value"]}
                    type="daterange"
                    update-value-on-close={true}
                    is-date-disabled={this.createdDateDisabled}
                    ranges={this.defaultCreateDateFilterRange}
                    actions={["confirm"]}
                  />
                </n-tab-pane>
                <n-tab-pane name="Updated" tab="Updated Date Filter">
                  <n-date-picker
                    v-model={[this.updateDateFilterRange, "value"]}
                    type="daterange"
                    update-value-on-close={true}
                    is-date-disabled={this.updatedDateDisabled}
                    ranges={this.defaultUpdateDateFilterRange}
                    actions={["confirm"]}
                  />
                </n-tab-pane>
              </n-tabs>
            </div>
          </div>
        </div>
        <n-data-table
          columns={this.columns}
          data={this.tableData}
          pagination={this.pagination}
          scroll-x="1200"
          max-height="100%"
          virtual-scroll
        />
      </div>
    );
  },
});
