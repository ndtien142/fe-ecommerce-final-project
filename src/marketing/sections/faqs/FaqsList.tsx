// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const FAQS = [
  {
    id: 'faq1',
    heading: 'Chính sách đổi trả sản phẩm như thế nào?',
    detail:
      'Mini Furniture áp dụng chính sách đổi trả trong vòng 30 ngày cho hầu hết sản phẩm. Sản phẩm phải còn nguyên vẹn, chưa sử dụng và có đầy đủ bao bì. Sản phẩm theo yêu cầu riêng có thời gian đổi trả 14 ngày. Chi phí vận chuyển đổi trả do khách hàng chi trả, trừ trường hợp sản phẩm bị lỗi.',
  },
  {
    id: 'faq2',
    heading: 'Thời gian giao hàng là bao lâu?',
    detail:
      'Giao hàng tiêu chuẩn: 7-14 ngày làm việc. Giao hàng nhanh: 2-5 ngày làm việc cho một số sản phẩm được chọn. Dịch vụ giao hàng cao cấp bao gồm lắp đặt chuyên nghiệp và thu hồi nội thất cũ. Chúng tôi sẽ liên hệ để sắp xếp lịch giao hàng khi đơn hàng sẵn sàng.',
  },
  {
    id: 'faq3',
    heading: 'Có dịch vụ lắp đặt không?',
    detail:
      'Có! Chúng tôi cung cấp dịch vụ giao hàng cao cấp bao gồm lắp đặt chuyên nghiệp, sắp xếp trong phòng theo yêu cầu và thu dọn bao bì. Dịch vụ này có phí phụ trội. Chúng tôi cũng cung cấp hướng dẫn lắp đặt chi tiết cho khách hàng tự lắp đặt.',
  },
  {
    id: 'faq4',
    heading: 'Sản phẩm được làm từ những chất liệu gì?',
    detail:
      'Chúng tôi sử dụng các chất liệu chất lượng cao bao gồm gỗ tự nhiên, gỗ công nghiệp, vải cao cấp, da thật và khung kim loại bền. Mỗi trang sản phẩm có thông tin chi tiết về chất liệu. Chúng tôi ưu tiên sử dụng chất liệu bền vững và thân thiện với môi trường.',
  },
  {
    id: 'faq5',
    heading: 'Có thể tùy chỉnh sản phẩm không?',
    detail:
      'Có, chúng tôi cung cấp tùy chọn tùy chỉnh cho nhiều sản phẩm nội thất. Bạn có thể chọn từ các loại vải, màu sắc, kích thước và cấu hình khác nhau. Đơn hàng tùy chỉnh thường mất 4-6 tuần để hoàn thành. Liên hệ đội ngũ thiết kế để được hỗ trợ cá nhân hóa.',
  },
  {
    id: 'faq6',
    heading: 'Chính sách bảo hành như thế nào?',
    detail:
      'Chúng tôi cung cấp bảo hành 1 năm cho khung và cơ cấu nội thất, 6 tháng cho vải và bọc da, 2 năm cho nệm và đệm, và bảo hành trọn đời cho cấu trúc gỗ tự nhiên. Bảo hành bao gồm lỗi sản xuất nhưng không bao gồm hao mòn thông thường.',
  },
  {
    id: 'faq7',
    heading: 'Có hỗ trợ trả góp không?',
    detail:
      'Có, chúng tôi hợp tác với nhiều công ty tài chính để cung cấp các tùy chọn thanh toán linh hoạt. Bạn có thể chọn trả góp 0% lãi suất cho đơn hàng đủ điều kiện, các gói thanh toán hàng tháng và tùy chọn thuê mua. Đăng ký trực tuyến hoặc tại cửa hàng để được phê duyệt ngay.',
  },
  {
    id: 'faq8',
    heading: 'Cách chăm sóc nội thất như thế nào?',
    detail:
      'Hướng dẫn chăm sóc khác nhau tùy theo chất liệu. Chúng tôi cung cấp hướng dẫn chăm sóc chi tiết với mỗi sản phẩm. Nhìn chung, tránh ánh nắng trực tiếp, sử dụng sản phẩm tẩy rửa phù hợp, lau chùi thường xuyên và tuân theo hướng dẫn của nhà sản xuất. Khuyến khích vệ sinh chuyên nghiệp cho vải tinh tế.',
  },
];

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <>
      {FAQS.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary
            expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
