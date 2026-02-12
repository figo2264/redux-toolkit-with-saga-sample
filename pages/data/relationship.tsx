import Head from "next/head";
import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";

interface Relationship {
  id: string;
  domain: string;
  relationshipType: string;
  sourceEntity: string;
  targetEntity: string;
  forwardName: string;
  reverseName: string;
  isActive: boolean;
}

// Mock data
const mockRelationships: Relationship[] = Array.from({ length: 60 }, (_, i) => ({
  id: `REL${String(i + 1).padStart(3, "0")}`,
  domain: ["자동차", "부품", "서비스", "디자인", "엔지니어링"][i % 5],
  relationshipType: ["연관", "상속", "집합", "의존", "구현"][i % 5],
  sourceEntity: `소스엔티티${i + 1}`,
  targetEntity: `타겟엔티티${i + 1}`,
  forwardName: ["포함하다", "참조하다", "상속하다", "구성하다", "사용하다"][i % 5],
  reverseName: ["포함됨", "참조됨", "상속됨", "구성됨", "사용됨"][i % 5],
  isActive: i % 3 !== 0,
}));

const ITEMS_PER_PAGE = 10;

export default function RelationshipPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Filter relationships based on search term
  const filteredRelationships = useMemo(() => {
    if (!searchTerm.trim()) return mockRelationships;
    return mockRelationships.filter(
      (rel) =>
        rel.relationshipType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rel.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rel.sourceEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rel.targetEntity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRelationships.length / ITEMS_PER_PAGE);
  const paginatedRelationships = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRelationships.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRelationships, currentPage]);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedItems.size === paginatedRelationships.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedRelationships.map((r) => r.id)));
    }
  };

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleDeleteSelected = () => {
    // TODO: Implement delete functionality
    console.log("Delete selected:", Array.from(selectedItems));
  };

  const handleRegister = () => {
    // TODO: Implement register functionality
    console.log("Register new relationship");
  };

  // Pagination range
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const isAllSelected =
    paginatedRelationships.length > 0 &&
    selectedItems.size === paginatedRelationships.length;

  return (
    <>
      <Head>
        <title>Relationship 관리 - CONTROL</title>
        <meta name="description" content="Relationship 관리 페이지" />
      </Head>
      <Layout>
        <div className="list-container">
          {/* Search & Filter Area */}
          <div className="list-top-area">
            <div className="search-main-container">
              <div className="field-area">
                <div className="field field-input-text large">
                  <form onSubmit={handleSearch}>
                    <div className="search-bar-box">
                      <div className="input-box">
                        <input
                          type="text"
                          placeholder="관계유형명을 입력하세요.."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="input-button-box">
                          <button type="submit" className="btn-search">
                            <span className="sr-only">검색</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="button-box">
                <button type="button" className="btn-filter">
                  필터
                </button>
              </div>
            </div>
          </div>

          {/* Title & Register Button */}
          <div className="content-top-area border-none">
            <div className="content-top-inner">
              <h2>Relationship 관리</h2>
              <div className="flex-area">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRegister}
                >
                  관계유형 등록
                </button>
              </div>
            </div>
          </div>

          {/* Count & Actions */}
          <div className="list-top-area border-bottom">
            <div className="list-info-box">
              <span className="list-count">
                전체 <span className="num">{filteredRelationships.length}</span>
              </span>
              <div className="divider"></div>
              <button
                type="button"
                className="btn btn-secondary btn-outline-two"
                onClick={handleDeleteSelected}
                disabled={selectedItems.size === 0}
              >
                선택 삭제
              </button>
            </div>
            <div className="list-button-box">
              <button type="button" className="btn-sort" title="정렬">
                <span className="sr-only">정렬</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "48px" }}>
                    <div className="field-container">
                      <div className="field field-input-checkbox">
                        <input
                          type="checkbox"
                          id="checkAll"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                        />
                        <label htmlFor="checkAll"></label>
                      </div>
                    </div>
                  </th>
                  <th className="sort" style={{ width: "200px" }}>
                    <button type="button" className="btn-sort">
                      <span>도메인</span>
                    </button>
                  </th>
                  <th className="sort" style={{ width: "120px" }}>
                    <button type="button" className="btn-sort">
                      <span>관계유형명</span>
                    </button>
                  </th>
                  <th className="sort" style={{ width: "200px" }}>
                    <button type="button" className="btn-sort">
                      <span>Source 엔티티</span>
                    </button>
                  </th>
                  <th className="sort" style={{ width: "200px" }}>
                    <button type="button" className="btn-sort">
                      <span>Target 엔티티</span>
                    </button>
                  </th>
                  <th style={{ width: "120px" }}>정방향 호칭</th>
                  <th style={{ width: "120px" }}>역방향 호칭</th>
                  <th className="sort" style={{ width: "100px" }}>
                    <button type="button" className="btn-sort">
                      <span>사용여부</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRelationships.map((relationship) => (
                  <tr key={relationship.id}>
                    <td>
                      <div className="field-container">
                        <div className="field field-input-checkbox">
                          <input
                            type="checkbox"
                            id={`check-${relationship.id}`}
                            checked={selectedItems.has(relationship.id)}
                            onChange={() => handleSelectItem(relationship.id)}
                          />
                          <label htmlFor={`check-${relationship.id}`}></label>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="elli">{relationship.domain}</span>
                    </td>
                    <td>
                      <span className="elli">{relationship.relationshipType}</span>
                    </td>
                    <td>
                      <span className="elli">{relationship.sourceEntity}</span>
                    </td>
                    <td>
                      <span className="elli">{relationship.targetEntity}</span>
                    </td>
                    <td>
                      <span className="elli">{relationship.forwardName}</span>
                    </td>
                    <td>
                      <span className="elli">{relationship.reverseName}</span>
                    </td>
                    <td className="center">
                      <span
                        className={`state ${
                          relationship.isActive ? "complete" : "ing"
                        }`}
                      >
                        {relationship.isActive ? "Y" : "N"}
                      </span>
                    </td>
                  </tr>
                ))}
                {paginatedRelationships.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="pagination">
              <button
                type="button"
                className="btn-first"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">첫 페이지</span>
              </button>
              <button
                type="button"
                className="btn-preview"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">이전 페이지</span>
              </button>
              <div className="pager">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-pager ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn-next"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">다음 페이지</span>
              </button>
              <button
                type="button"
                className="btn-last"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">마지막 페이지</span>
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
